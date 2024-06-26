import { Form, useFetcher, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { SessionService } from "~/api/modules/session/session.service";
import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { FoodLogService } from "~/api/modules/food-log/food-log.service";
import { Button, links as buttonLinks } from '~/components/button/Button';
import { Timeline, links as timelineLinks } from "./timeline/Timeline";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";
import styles from './logs._index.css?url';
import { Main, links as mainLinks } from "~/components/main/Main";
import { useState } from "react";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { isFetcherLoading } from "~/utils/fetcherLoading";
import { Input, links as labelLinks } from "~/components/input/Input";
import { RequestMethods } from "~/enums/requests";
import { DailyLogService } from "~/api/modules/daily-log/daily-log.service";
import { DailyLog } from "@prisma/client";
import { IconNames } from "~/enums/icons";
import { DateTime } from "luxon";
import { dateAsHumanString } from "~/utils/datetime";

type FetcherResponseType = { foodLogs: IFoodLogWithNestedFoods[] };

const TIMES = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
];

// const EARLY_MORNING_BLOCK = TIMES.slice(0, 6);
const MORNING_BLOCK = TIMES.slice(6, 12);
const AFTERNOON_BLOCK = TIMES.slice(12, 18);
const EVENING_BLOCK = TIMES.slice(18, 24);

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...timelineLinks(),
    ...labelLinks(),
];

interface LoaderDataProps {
    userId: string;
    dailyLog: DailyLog | null;
    foodLogs: IFoodLogWithNestedFoods[];
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await SessionService.requireAuth(request);
    // Default to today's logs
    const params = new URL(request.url).searchParams;
    const dateParam = params.get('date');
    const date = dateParam ? new Date(dateParam) : new Date();
    const isoDate = date.toISOString();
    const dailyLog = await DailyLogService.findByDate(userId, isoDate);
    const foodLogs = await FoodLogService.findLogsForDate(userId, isoDate);
    return json({ userId, foodLogs, dailyLog });
}

export default function FoodLogsPage() {
    const { userId, foodLogs, dailyLog } = useLoaderData<LoaderDataProps>();
    const [searchParams, setSearchParams] = useSearchParams();
    const startDate = searchParams.get('date') ?? DateTime.now().toISODate();
    const [date, setDate] = useState(startDate);
    const navigate = useNavigate();
    const isoDate = DateTime.fromISO(date).toISO() as string;
    const fetcher = useFetcher<FetcherResponseType>();
    const foodLogsForDate = fetcher.data?.foodLogs ?? foodLogs;
    const isLoading = isFetcherLoading(fetcher);
    const dateAsText = dateAsHumanString(date);
    const setMetricsText = (() => {
        switch(dateAsText) {
            case 'Today': return 'Set Today\'s Metrics';
            case 'Yesterday': return 'Set Yesterday\'s Metrics';
            default: return `Set Metrics for ${dateAsText}`
        }
    })();

    const onDateChange = (dateVal: string) => {
        const newDate = DateTime.fromISO(dateVal);
        if (newDate > DateTime.now()) return;
        setDate(dateVal);
        const isoDate = newDate.toISO();
        fetcher.load(`${APIRoutes.FOOD_LOGS}?isoDate=${isoDate}&userId=${userId}`);
        setSearchParams(prev => {
            prev.set('date', dateVal);
            return prev;
        });
    }

    const handleSetMetricsClick = async () => {
        if (dailyLog) {
            navigate(`${PageRoutes.DAILY_LOGS}/${startDate}`);
            return;
        }
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('isoDate', isoDate);
        fetcher.submit(formData, {
            method: RequestMethods.POST,
            action: APIRoutes.DAILY_LOGS,
            navigate: true,
        });
    }

    return (
        <Main
            name="FoodLogs"
            title={`Food Logs from ${dateAsText}`}
            subtitle={(
                <Input
                    type="date"
                    name={"Date"}
                    value={date}
                    size="sm"
                    max={DateTime.now().toISODate()}
                    onChange={onDateChange}
                />
            )}
        >
            <FlexBox col center width="full" gap="xl">
                <Button
                    type="submit"
                    onClick={handleSetMetricsClick}
                    variant="primary"
                    size="md"
                    width="full"
                    icon={IconNames.Metrics}
                    loading={isLoading}
                >
                    {setMetricsText}
                </Button>
                <FlexBox col gap="xl" width="full" padBottom='1/3'>
                    <Timeline userId={userId} foodLogs={foodLogsForDate} isLoading={false}>
                        <Timeline.Block times={MORNING_BLOCK} name="Morning" />
                        <Timeline.Block times={AFTERNOON_BLOCK} name="Afternoon" />
                        <Timeline.Block times={EVENING_BLOCK} name="Evening" />
                    </Timeline>
                </FlexBox>
            </FlexBox>
        </Main>
    );
}