import { useLoaderData } from "@remix-run/react";
import { SessionService } from "~/api/modules/session/session.service";
import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import logsStyles from './logs.styles.css';
import { FoodLogService } from "~/api/modules/food-log/food-log.service";
import {links as buttonLinks } from '~/components/button/Button';
import { TimelineBlock, links as timelineBlockLinks } from "./timeline-block/TimelineBlock";

const TIMES = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
];

const EARLY_MORNING_BLOCK = TIMES.slice(0, 6);
const MORNING_BLOCK = TIMES.slice(6, 12);
const AFTERNOON_BLOCK = TIMES.slice(12, 18);
const EVENING_BLOCK = TIMES.slice(18, 24);

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: logsStyles },
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...timelineBlockLinks(),
];

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await SessionService.requireAuth(request);
    const today = new Date();
    const foodLogs = await FoodLogService.findLogsForDate(userId, today);
    return json({ userId, foodLogs });
}

export default function FoodLogsPage() {
    const { userId, foodLogs } = useLoaderData<typeof loader>();

    // TODO: add food logs to timeline

    return (
        <FlexBox col center width="full" padBottom='1/3'>
            <div className="timeline">
                <FlexBox col gap="xl" width="full">
                    <TimelineBlock times={EARLY_MORNING_BLOCK} name="Early Morning" userId={userId} />
                    <TimelineBlock times={MORNING_BLOCK} name="Morning" userId={userId} />
                    <TimelineBlock times={AFTERNOON_BLOCK} name="Afternoon" userId={userId} />
                    <TimelineBlock times={EVENING_BLOCK} name="Evening" userId={userId} />
                </FlexBox>
            </div>
        </FlexBox>
    );
}