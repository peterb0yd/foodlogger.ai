import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { DailyLogService } from "~/api/modules/daily-log/daily-log.service";
import { SessionService } from "~/api/modules/session/session.service";
import { Main } from "~/components/main/Main";
import { TrackSlider, links as trackSliderLinks } from "./track-slider/TrackSlider";
import { useCallback, useState } from "react";
import { IDailyLogUpdateData } from "~/api/modules/daily-log/daily-log.interfaces";
import { RequestMethods } from "~/enums/requests";
import { debounce } from "lodash-es";
import { APIRoutes } from "~/enums/routes";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";

export const links: LinksFunction = () => [
    ...trackSliderLinks(),
    ...flexboxLinks(),
    ...textLinks(),
];

export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.requireAuth(context.request);
    const { date: dateParam } = context.params;
    const date = dateParam ? new Date(dateParam) : new Date();
    const isoDate = date.toISOString();
    const dailyLog = await DailyLogService.findByDate(userId, isoDate);
    return { dailyLog };
};

export default function DailyLogPage() {
    const { dailyLog } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const [dailyLogData, setDailyLogData] = useState(dailyLog);

    const handleChange = useCallback(debounce((data: IDailyLogUpdateData) => {
        const updateData = { json: JSON.stringify(data) };
        fetcher.submit(updateData, {
            action: `${APIRoutes.DAILY_LOGS}/${dailyLog.id}`,
            method: RequestMethods.PATCH,
        })
    }, 500), []);

    const handleUserChange = (key: string, val: number) => {
        const newLogData = { ...setDailyLogData, [key]: val };
        setDailyLogData(newLogData);
        handleChange(newLogData);
    };

    return (
        <Main name="DailyLog" title="Daily Log" subtitle="How did today go?">
            <TrackingSection
                name="Mood"
                key="mood"
                value={dailyLogData.moodQuality}
                onChange={(value: number) => handleUserChange('mood', value)}
            />
        </Main>
    );
}

interface TrackingSectionProps {
    name: string;
    value: number;
    onChange: (value: number) => void;
}

const TrackingSection = ({ name, value, onChange }: TrackingSectionProps) => {
    return (
        <FlexBox gap="md">
            <Text color="primary" size="md" weight="bold">{name}</Text>
            <TrackSlider
                value={value}
                onChange={onChange}
            />
        </FlexBox>
    );
}