import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useRef } from "react";
import { useFetcher } from "react-router-dom";
import { SessionService } from "~/api/modules/session/session.service";
import { TemplateService } from "~/api/modules/template/template.service";
import { BottomBar, links as bottomBarLinks } from "~/components/bottom-bar/BottomBar";
import { Input, links as inputLinks } from "~/components/input/Input";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { IconNames } from "~/enums/icons";
import { isFetcherLoading } from "~/utils/fetcherLoading";
import { FoodItemList, links as foodListLinks } from "~/components/food-item-list/FoodItemList";
import { Label, links as labelLinks } from "~/components/label/Label";
import { Main, links as mainLinks } from "~/components/main/Main";

export const links: LinksFunction = () => [
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
    const params = useParams();
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const isLoading = isFetcherLoading(fetcher);

    const handleSubmit = async () => {
        const formData = new FormData(formRef.current as HTMLFormElement);
        const name = formData.get('name') as string;
        const formDataToSubmit = new FormData();
        formDataToSubmit.set('name', name);
        fetcher.submit(formDataToSubmit, {
            method: RequestMethods.PATCH,
            action: `${APIRoutes.TEMPLATES}/${params.id}`,
        });
    }

    const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <Main name="Edit Template" title="Edit Your Template">
            <FlexBox height="full" center>
                <FlexBox col gap="lg">
                    <fetcher.Form onSubmit={handleFormSubmission} ref={formRef}>
                        <Input type="text" name="name" label="Name" defaultValue={template.name} />
                    </fetcher.Form>
                    <FlexBox col>
                        <Label>Food Items</Label>
                        <FoodItemList
                            items={template.items}
                        />
                    </FlexBox>
                </FlexBox>

                <BottomBar>
                    <BottomBar.SecondaryButton
                        text="Cancel"
                        icon={IconNames.ChevronLeft}
                        onClick={() => navigate(PageRoutes.LOGS)}
                        disabled={isLoading}
                    />
                    <BottomBar.PrimaryButton
                        text="Save"
                        icon={IconNames.CheckMark}
                        onClick={handleSubmit}
                        loading={isLoading}
                    />
                </BottomBar>
            </FlexBox>
        </Main>
    );
}