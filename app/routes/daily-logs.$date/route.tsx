import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate, useNavigation, useNavigationType } from "@remix-run/react";
import { DailyLogService } from "~/api/modules/daily-log/daily-log.service";
import { SessionService } from "~/api/modules/session/session.service";
import { Main, links as mainLinks } from "~/components/main/Main";
import { TrackSlider, links as trackSliderLinks } from "./track-slider/TrackSlider";
import { PropsWithChildren, useCallback, useState } from "react";
import { IDailyLogUpdateData } from "~/api/modules/daily-log/daily-log.interfaces";
import { RequestMethods } from "~/enums/requests";
import { debounce } from "lodash-es";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { UserService } from "~/api/modules/user/user.service";
import { IUserWithSettings } from "~/api/modules/user/user.interfaces";
import { TextBox, links as textboxLinks } from "~/components/text-box/TextBox";
import { BottomBar, links as bottomBarLinks } from "~/components/bottom-bar/BottomBar";
import { IconNames } from "~/enums/icons";
import { DateTime } from "luxon";

export const links: LinksFunction = () => [
    ...mainLinks(),
    ...trackSliderLinks(),
    ...flexboxLinks(),
    ...textboxLinks(),
    ...textLinks(),
    ...bottomBarLinks(),
];

export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.requireAuth(context.request);
    const dateParam = context.params.date as string;
    const isoDate = DateTime.fromISO(dateParam).toISO() as string;
    const dailyLog = await DailyLogService.findByDate(userId, isoDate);
    const user = await UserService.findByIdWithSettings(userId);
    return { dailyLog, user };
};

export default function DailyLogPage() {
    const { dailyLog, user } = useLoaderData<typeof loader>();
    const { settings } = user as IUserWithSettings;
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const navigationType = useNavigationType();
    const backLink = navigationType === 'PUSH' ? -1 : PageRoutes.LOGS;
    const [dailyLogData, setDailyLogData] = useState(dailyLog);
    const isLoading = navigation.state === 'loading';

    const handleChange = useCallback(debounce((data: IDailyLogUpdateData) => {
        const updateData = { json: JSON.stringify(data) };
        fetcher.submit(updateData, {
            action: `${APIRoutes.DAILY_LOGS}/${dailyLog.id}`,
            method: RequestMethods.PATCH,
            navigate: false,
        })
    }, 500), []);

    const handleLogChange = (key: string, val: number | string) => {
        const newLogData = { ...dailyLogData, [key]: val };
        setDailyLogData(newLogData);
        handleChange(newLogData);
    };

    return (
        <Main
            name="DailyLog"
            title="Daily Log"
            subtitle="Move the sliders left or right to set each metric."
            padBottom="1/3"
        >
            <FlexBox gap="lg" col width="full">
                {settings.isTrackingMood && (
                    <TrackingSection
                        label="How was your mood today?"
                    >
                        <TrackSlider
                            value={dailyLogData.moodQuality}
                            onChange={(value: number) => handleLogChange('moodQuality', value)}
                        />
                    </TrackingSection>
                )}
                {settings.isTrackingAnxiety && (
                    <TrackingSection
                        label="How was your anxiety today?"
                    >
                        <TrackSlider
                            value={dailyLogData.anxietyQuality} onChange={(value: number) => handleLogChange('anxietyQuality', value)}
                        />
                    </TrackingSection>
                )}
                {settings.isTrackingEnergy && (
                    <TrackingSection
                        label="How were your energy levels today?"
                    >
                        <TrackSlider
                            value={dailyLogData.energyQuality}
                            onChange={(value: number) => handleLogChange('energyQuality', value)}
                        />
                    </TrackingSection>
                )}
                {settings.isTrackingExercise && (
                    <TrackingSection
                        label="How did your exercise go today?"
                    >
                        <TrackSlider
                            value={dailyLogData.exerciseQuality}
                            onChange={(value: number) => handleLogChange('exerciseQuality', value)}
                        />
                    </TrackingSection>
                )}
                {settings.isTrackingPoop && (
                    <TrackingSection
                        label="How were your bowel movements today?"
                    >
                        <TrackSlider
                            value={dailyLogData.poopQuality}
                            onChange={(value: number) => handleLogChange('poopQuality', value)}
                        />
                    </TrackingSection>
                )}
                {settings.isTrackingSleep && (
                    <TrackingSection
                        label="How was your sleep last night?"
                    >
                        <TrackSlider
                            value={dailyLogData.sleepQuality}
                            onChange={(value: number) => handleLogChange('sleepQuality', value)}
                        />
                    </TrackingSection>
                )}
                <TrackingSection
                    label="Any notes to add?"
                >
                    <TextBox
                        value={dailyLogData.notes ?? ''}
                        placeholder={"Add notes here..."}
                        onChange={(value: string) => handleLogChange('notes', value)}
                    />
                </TrackingSection>
            </FlexBox>

            <BottomBar>
                {/* <BottomBar.SecondaryButton
                    text="Create Template"
                    icon={IconNames.Template}
                    onClick={handleCreateTemplate}
                    disabled={isLoading || !hasFoodItems}
                    loading={isLoading}
                /> */}
                <BottomBar.PrimaryButton
                    text="Done Editing"
                    icon={IconNames.CheckMark}
                    onClick={() => navigate(backLink as string)}
                    loading={isLoading}
                />
            </BottomBar>
        </Main>
    );
}

interface TrackingSectionProps extends PropsWithChildren {
    label: string;
}

const TrackingSection = ({ label, children }: TrackingSectionProps) => {
    return (
        <FlexBox gap="md" col width="full">
            <Text color="soft" size="base" weight="bold">{label}</Text>
            {children}
        </FlexBox>
    );
}