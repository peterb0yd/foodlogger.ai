import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { SessionService } from "~/api/modules/session/session.service";
import { UserService } from "~/api/modules/user/user.service";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { IUserCreateData, IUserWithSettings } from "~/api/modules/user/user.interfaces";
import { RequestMethods } from "~/enums/requests";
import { Main, links as mainLinks } from "~/components/main/Main";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { List, links as listLinks } from "~/components/list/List";
import { Checkbox, links as checkboxLinks } from "~/components/checkbox/Checkbox";
import { Input, links as inputLinks } from "~/components/input/Input";
import styles from './settings.css';
import { APIRoutes } from "~/enums/routes";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import { ISettingsCreateData } from "~/api/modules/settings/settings.interfaces";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...flexboxLinks(),
    ...textLinks(),
    ...listLinks(),
    ...checkboxLinks(),
    ...inputLinks(),
];

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await SessionService.requireAuth(request);
    const user = await UserService.findByIdWithSettings(userId);
    return { user };
}

// TODO: implement optimistic UI updates
export default function Settings() {
    const { user } = useLoaderData<{ user: IUserWithSettings }>();
    const fetcher = useFetcher();
    const [userData, setUserData] = useState(user);
    const [settingsData, setSettingsData] = useState(user.settings);
    const updateUserUrl = `${APIRoutes.USERS}/${user.id}`;
    const updateSettingsUrl = `${APIRoutes.USERS}/${user.id}/settings`;

    useEffect(() => handleChange(updateUserUrl, userData as IUserCreateData), [userData]);
    useEffect(() => handleChange(updateSettingsUrl, settingsData as ISettingsCreateData), [settingsData]);

    const handleChange = useCallback(debounce((action: string, data: IUserCreateData | ISettingsCreateData) => {
        const updateData = { json: JSON.stringify(data) };
        fetcher.submit(updateData, {
            action,
            method: RequestMethods.PATCH,
            navigate: true,
        })
        // TODO: handle error?
    }, 500), []);

    const handleUserChange = (key: string, val: string | boolean) => {
        setUserData({ ...userData, [key]: val });
    };

    const handleSettingsChange = (key: string, val: string | boolean) => {
        setSettingsData({ ...settingsData, [key]: val });
    };

    return (
        <Main
            name="Settings"
            title="Settings"
            subtitle={"Customize your experience"}
        >
            <FlexBox col gap="xl" width="full">

                <Section title="Account">
                    <List variant="compact">
                        <List.Item>
                            <Input
                                name="name"
                                label="Name"
                                fullWidth
                                placeholder="Your name..."
                                value={userData.name as string}
                                onChange={(val) => handleUserChange('name', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="email"
                                label="Email"
                                fullWidth
                                placeholder="Your email..."
                                value={userData.email as string}
                                onChange={(val) => handleUserChange('email', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="phone"
                                label="Phone"
                                fullWidth
                                placeholder="Your phone..."
                                value={userData.phone as string}
                                onChange={(val) => handleUserChange('phone', val)}
                            />
                        </List.Item>
                    </List>
                </Section>

                <Section title="Tracking">
                    <fetcher.Form
                        action={`/users/${user.id}/settings`}
                        method={RequestMethods.PATCH}
                    >
                        <List variant="spacious">
                            <List.Item>
                                <Checkbox
                                    name="exercise"
                                    label="Track Exercise"
                                    gap="md"
                                    checked={settingsData.isTrackingExercise}
                                    onChange={(val) => handleSettingsChange('isTrackingExercise', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="energy"
                                    label="Track Energy"
                                    gap="md"
                                    checked={settingsData.isTrackingEnergy}
                                    onChange={(val) => handleSettingsChange('isTrackingEnergy', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="poop"
                                    label="Track Poop"
                                    gap="md"
                                    checked={settingsData.isTrackingPoop}
                                    onChange={(val) => handleSettingsChange('isTrackingPoop', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="mood"
                                    label="Track Mood"
                                    gap="md"
                                    checked={settingsData.isTrackingMood}
                                    onChange={(val) => handleSettingsChange('isTrackingMood', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="anxiety"
                                    label="Track Anxiety"
                                    gap="md"
                                    checked={settingsData.isTrackingAnxiety}
                                    onChange={(val) => handleSettingsChange('isTrackingAnxiety', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="sleep"
                                    label="Track Sleep"
                                    gap="md"
                                    checked={settingsData.isTrackingSleep}
                                    onChange={(val) => handleSettingsChange('isTrackingSleep', val)}
                                />
                            </List.Item>
                        </List>
                    </fetcher.Form>
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
        <FlexBox name={title} col gap="sm" width="full">
            <Text color="soft" size="sm" weight="black" uppercase>
                {title}
            </Text>
            {children}
        </FlexBox>
    );
}