import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { SessionService } from "~/api/modules/session/session.service";
import { TemplateService } from "~/api/modules/template/template.service";
import { BottomBar, links as bottomBarLinks } from "~/components/bottom-bar/BottomBar";
import { Input, links as inputLinks } from "~/components/input/Input";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import styles from './templates.$id.css?url';
import { RequestMethods } from "~/enums/requests";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { IconNames } from "~/enums/icons";
import { isFetcherLoading } from "~/utils/fetcherLoading";
import { FoodItemList, links as foodListLinks } from "~/components/food-item-list/FoodItemList";
import { Label, links as labelLinks } from "~/components/label/Label";
import { Main, links as mainLinks } from "~/components/main/Main";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...bottomBarLinks(),
    ...inputLinks(),
    ...flexboxLinks(),
    ...textLinks(),
    ...foodListLinks(),
    ...labelLinks(),
];

export const loader: LoaderFunction = async (context) => {
    await SessionService.requireAuth(context.request);
    const template = await TemplateService.findById(context.params.id as string);
    return { template };
}

export default function TemplateCreatePage() {
    const { template } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const params = useParams();
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    const isLoading = isFetcherLoading(fetcher);
    const [name, setName] = useState(template.name);

    const onSaveButtonClick = () => {
        const input = (formRef.current?.querySelector('input[name="name"]') as HTMLInputElement);
        const validity = input.checkValidity();
        if (!validity) {
            input.reportValidity();
            return;
        }
        fetcher.submit(formRef.current, {
            method: RequestMethods.PATCH,
            action: `${APIRoutes.TEMPLATES}/${params.id}`,
            navigate: true,
        });
    }

    return (
        <Main name="Edit Template" title="Edit Your Template" padBottom="1/3">
            <FlexBox col gap="xl" width="full">
                <fetcher.Form
                    method={RequestMethods.PATCH}
                    action={`${APIRoutes.TEMPLATES}/${params.id}`}
                    ref={formRef}
                >
                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        fullWidth
                        value={name}
                        required
                        placeholder="Your template's name..."
                        onChange={(val) => setName(val)}
                    />
                </fetcher.Form>
                <FlexBox col gap="md" width="full">
                    <Label padLeft text={`Template's Food Items`} />
                    <FoodItemList
                        items={template.items}
                    />
                </FlexBox>
            </FlexBox>

            <BottomBar>
                <BottomBar.SecondaryButton
                    text="Remove Template"
                    icon={IconNames.ChevronLeft}
                    onClick={() => navigate(PageRoutes.LOGS)}
                    disabled={isLoading}
                />
                <BottomBar.PrimaryButton
                    text="Save Template"
                    icon={IconNames.CheckMark}
                    onClick={onSaveButtonClick}
                    loading={isLoading}
                />
            </BottomBar>
        </Main>
    );
}