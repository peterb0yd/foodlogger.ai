import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useRef } from "react";
import { useFetcher } from "react-router-dom";
import { SessionService } from "~/api/modules/session/session.service";
import { TemplateService } from "~/api/modules/template/template.service";
import { BottomBar } from "~/components/bottom-bar/BottomBar";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Input } from "~/components/input/Input";
import { Text } from "~/components/text/Text";
import { RequestMethods } from "~/enums/requests";
import { APIRoutes } from "~/enums/routes";
import { MainLayout } from "~/layout/main-layout/MainLayout";

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
        <MainLayout>
            <MainLayout.Header />
            <MainLayout.Content>
                <FlexBox col>
                    <Text size="lg">Template: {template.name}</Text>
                    <fetcher.Form onSubmit={handleFormSubmission} ref={formRef}>
                        <Input type="text" name="name" label="Name" />
                    </fetcher.Form>
                </FlexBox>
                <BottomBar
                    primaryActionText="Save"
                    primaryAction={handleSubmit}
                    secondaryActionText="Cancel"
                    secondaryAction={() => history.back()}
                />
            </MainLayout.Content>
        </MainLayout>
    );
}