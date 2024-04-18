import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DailyLogService } from "~/api/modules/daily-log/daily-log.service";
import { SessionService } from "~/api/modules/session/session.service";
import { Main } from "~/components/main/Main";
import { TrackSlider, links as trackSliderLinks } from "./track-slider/TrackSlider";

export const links: LinksFunction = () => [
    ...trackSliderLinks(),
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

    return (
        <Main name="DailyLog" title="Daily Log">
            <TrackSlider />
        </Main>
    );
}