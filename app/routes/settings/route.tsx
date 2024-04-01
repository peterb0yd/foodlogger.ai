import { LinksFunction, LoaderFunction } from "@remix-run/node";
import styles from './settings.css';
import { SessionService } from "~/api/modules/session/session.service";
import { UserService } from "~/api/modules/user/user.service";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Main, links as mainLinks } from "~/components/main/Main";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { List, links as listLinks } from "~/components/list/List";
import { Checkbox, links as checkboxLinks } from "~/components/checkbox/Checkbox";
import { IUserWithSettings } from "~/api/modules/user/user.interfaces";
import { RequestMethods } from "~/enums/requests";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...flexboxLinks(),
    ...textLinks(),
    ...listLinks(),
    ...checkboxLinks(),
];

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await SessionService.requireAuth(request);
    const user = await UserService.findByIdWithSettings(userId);
    return { user };
}

export default function Settings() {
    const { user } = useLoaderData<{ user: IUserWithSettings }>();
    const fetcher = useFetcher();

    return (
        <Main
            name="Settings"
            title="Settings"
            subtitle={"Customize your experience"}
        >
            <FlexBox col gap="md">

                <Section title="Account">
                    <List>
                        <List.Item>
                            <Text>Email</Text>
                            <Text>{user.email}</Text>
                        </List.Item>
                        <List.Item>
                            <Text>Phone</Text>
                            <Text>{user.phone}</Text>
                        </List.Item>
                    </List>
                </Section>

                <Section title="Tracking">
                    <List>
                        <fetcher.Form
                            action={`/users/${user.id}/settings`}
                            method={RequestMethods.PATCH}
                        >
                            <List.Item>
                                <Text>{'Track Exercise'}</Text>
                                <Checkbox
                                    name="exercise"
                                    checked={user.settings.isTrackingExercise}
                                />
                            </List.Item>
                            <List.Item>
                                <Text>{'Track Energy'}</Text>
                                <Checkbox
                                    name="energy"
                                    checked={user.settings.isTrackingEnergy}
                                />
                            </List.Item>
                            <List.Item>
                                <Text>{'Track Poop'}</Text>
                                <Checkbox
                                    name="poop"
                                    checked={user.settings.isTrackingPoop}
                                />
                            </List.Item>
                            <List.Item>
                                <Text>{'Track Mood'}</Text>
                                <Checkbox
                                    name="mood"
                                    checked={user.settings.isTrackingMood}
                                />
                            </List.Item>
                            <List.Item>
                                <Text>{'Track Anxiety'}</Text>
                                <Checkbox
                                    name="anxiety"
                                    checked={user.settings.isTrackingAnxiety}
                                />
                            </List.Item>
                            <List.Item>
                                <Text>{'Track Sleep'}</Text>
                                <Checkbox
                                    name="sleep"
                                    checked={user.settings.isTrackingSleep}
                                />
                            </List.Item>
                        </fetcher.Form>
                    </List>
                </Section>

            </FlexBox>
        </Main>
    );
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
    return (
        <FlexBox col gap="sm">
            <Text color="secondary" size="sm" weight="bold" uppercase>
                {title}
            </Text>
            {children}
        </FlexBox>
    );
}