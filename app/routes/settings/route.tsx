import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { SessionService } from "~/api/modules/session/session.service";
import { UserService } from "~/api/modules/user/user.service";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { IUserWithSettings } from "~/api/modules/user/user.interfaces";
import { RequestMethods } from "~/enums/requests";
import { Main, links as mainLinks } from "~/components/main/Main";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { List, links as listLinks } from "~/components/list/List";
import { Checkbox, links as checkboxLinks } from "~/components/checkbox/Checkbox";
import { Input, links as inputLinks } from "~/components/input/Input";
import styles from './settings.css';
import { APIRoutes } from "~/enums/routes";
import React, { useState } from "react";
import { debounce } from "lodash-es";

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

    const handleChange = (action: string, key: string, val: string | boolean) => {
        const updateData = { json: JSON.stringify({ [key]: val }) };
        fetcher.submit(updateData, {
            action,
            method: RequestMethods.PATCH,
            navigate: true,
        })
        // TODO: handle error?
    }

    const handleUserChange = debounce((key: string, val: string | boolean) => {
        handleChange(`${APIRoutes.USERS}/${user.id}`, key, val);
    }, 500);

    const handleSettingsChange = debounce((key: string, val: string | boolean) => {
        handleChange(`${APIRoutes.USERS}/${user.id}/settings`, key, val);
    }, 500);

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
                                defaultValue={user.name as string}
                                onChange={(val) => handleUserChange('name', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="email"
                                label="Email"
                                fullWidth
                                placeholder="Your email..."
                                defaultValue={user.email as string}
                                onChange={(val) => handleUserChange('email', val)}
                            />
                        </List.Item>
                        <List.Item>
                            <Input
                                name="phone"
                                label="Phone"
                                fullWidth
                                placeholder="Your phone..."
                                defaultValue={user.phone as string}
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
                                    checked={user.settings.isTrackingExercise}
                                    onChange={(val) => handleSettingsChange('isTrackingExercise', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="energy"
                                    label="Track Energy"
                                    gap="md"
                                    checked={user.settings.isTrackingEnergy}
                                    onChange={(val) => handleSettingsChange('isTrackingEnergy', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="poop"
                                    label="Track Poop"
                                    gap="md"
                                    checked={user.settings.isTrackingPoop}
                                    onChange={(val) => handleSettingsChange('isTrackingPoop', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="mood"
                                    label="Track Mood"
                                    gap="md"
                                    checked={user.settings.isTrackingMood}
                                    onChange={(val) => handleSettingsChange('isTrackingMood', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="anxiety"
                                    label="Track Anxiety"
                                    gap="md"
                                    checked={user.settings.isTrackingAnxiety}
                                    onChange={(val) => handleSettingsChange('isTrackingAnxiety', val)}
                                />
                            </List.Item>
                            <List.Item>
                                <Checkbox
                                    name="sleep"
                                    label="Track Sleep"
                                    gap="md"
                                    checked={user.settings.isTrackingSleep}
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