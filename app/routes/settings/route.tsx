import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { SessionService } from "~/api/modules/session/session.service";
import { UserService } from "~/api/modules/user/user.service";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { IUserCreateData, IUserWithSettings } from "~/api/modules/user/user.interfaces";
import { RequestMethods } from "~/enums/requests";
import { Main, links as mainLinks } from "~/components/main/Main";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { List, links as listLinks } from "~/components/list/List";
import { Checkbox, links as checkboxLinks } from "~/components/checkbox/Checkbox";
import { Input, links as inputLinks } from "~/components/input/Input";
import styles from './settings.css?url';
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

    const handleChange = useCallback(debounce((action: string, data: IUserCreateData | ISettingsCreateData) => {
        const updateData = { json: JSON.stringify(data) };
        fetcher.submit(updateData, {
            action,
            method: RequestMethods.PATCH,
        })
    }, 500), []);

    const handleUserChange = (key: string, val: string | boolean) => {
        const newUserData = { ...userData, [key]: val };
        setUserData(newUserData);
        handleChange(updateUserUrl, newUserData as IUserCreateData)
    };

    const handleSettingsChange = (key: string, val: string | boolean) => {
        const newSettingsData = { ...settingsData, [key]: val };
        setSettingsData(newSettingsData);
        handleChange(updateSettingsUrl, newSettingsData as ISettingsCreateData)
    };

    return (
        <Main
            name="Settings"
            title="Settings"
            subtitle={"Customize your profile and food logging experience."}
        >
            <FlexBox col gap="xl" width="full">

                <Section title="Account">
                    <List variant="compact" bg="none">
                        <List.Item>
                            <Input
                                name="name"
                                label="Name"
                                fullWidth
                                placeholder="Your name..."
                                value={userData.name as string ?? ''}
                                onChange={(val) => handleUserChange('name', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="email"
                                label="Email"
                                fullWidth
                                placeholder="Your email..."
                                value={userData.email as string ?? ''}
                                onChange={(val) => handleUserChange('email', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="phone"
                                label="Phone"
                                fullWidth
                                placeholder="Your phone..."
                                value={userData.phone as string ?? ''}
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
                                <SettingsCheckbox
                                    name="exercise"
                                    label="Track Exercise Performance"
                                    checked={settingsData.isTrackingExercise}
                                    onChange={(val) => handleSettingsChange('isTrackingExercise', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <SettingsCheckbox
                                    name="energy"
                                    label="Track Energy Levels"
                                    checked={settingsData.isTrackingEnergy}
                                    onChange={(val) => handleSettingsChange('isTrackingEnergy', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <SettingsCheckbox
                                    name="poop"
                                    label="Track Bowel Movements"
                                    checked={settingsData.isTrackingPoop}
                                    onChange={(val) => handleSettingsChange('isTrackingPoop', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <SettingsCheckbox
                                    name="mood"
                                    label="Track Mood"
                                    checked={settingsData.isTrackingMood}
                                    onChange={(val) => handleSettingsChange('isTrackingMood', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <SettingsCheckbox
                                    name="anxiety"
                                    label="Track Anxiety"
                                    checked={settingsData.isTrackingAnxiety}
                                    onChange={(val) => handleSettingsChange('isTrackingAnxiety', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <SettingsCheckbox
                                    name="sleep"
                                    label="Track Sleep"
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
        <FlexBox name={title} col gap="md" width="full">
            <Text color="soft" size="sm" weight="black" uppercase>
                {title}
            </Text>
            {children}
        </FlexBox>
    );
}

interface SettingsCheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const SettingsCheckbox = ({ name, label, checked, onChange }: SettingsCheckboxProps) => {
    return (
        <Checkbox
            name={name}
            label={label}
            gap="md"
            padX="lg"
            checkSide="right"
            spaced
            checked={checked}
            onChange={onChange}
        />
    );
}