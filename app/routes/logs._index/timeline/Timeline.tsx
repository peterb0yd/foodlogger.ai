import { PropsWithChildren, createContext, useContext } from "react";
import { TimelineBlock, links as timelineBlockLinks } from "./timeline-block/TimelineBlock";
import { LinksFunction } from "@remix-run/node";
import { IFoodLogWithNestedFoods } from "~/api/modules/food-log/food-log.interfaces";

interface TimelineContextProps {
    foodLogs: IFoodLogWithNestedFoods[];
    isLoading?: boolean;
    userId: string;
}

const TimelineContext = createContext<TimelineContextProps>({
    foodLogs: [],
    userId: '',
    isLoading: false,
});

export const useTimelineContext = () => useContext(TimelineContext);

export const links: LinksFunction = () => [
    ...timelineBlockLinks(),
];


interface TimelineProps extends PropsWithChildren<TimelineContextProps> {}

// Timeline Component that wraps TimelineBlock components with a Provider
export const Timeline = ({ userId, foodLogs, isLoading, children }: TimelineProps) => {
    return (
        <TimelineContext.Provider value={{ userId, foodLogs, isLoading }}>
            {children}
        </TimelineContext.Provider>
    );
}

Timeline.Block = TimelineBlock;