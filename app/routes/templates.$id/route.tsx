import { LoaderFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import { SessionService } from "~/api/modules/session/session.service";
import { BottomBar } from "~/components/bottom-bar/BottomBar";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Input } from "~/components/input/Input";
import { Text } from "~/components/text/Text";

export const loader: LoaderFunction = async (context) => {
    await SessionService.requireAuth(context.request);
}

export default function TemplateCreatePage() {
    const params = useParams();
    const submitter = useFetcher();

    const handleSubmit = () => {
        
    }

    return (
        <main>
            <FlexBox col>
                <Text size="lg">{`New Template`}</Text>
                <submitter.Form onSubmit={handleSubmit}>
                    <Input type="text" name="name" label="Name" />
                </submitter.Form>
            </FlexBox>
            <BottomBar 
                primaryActionText="Save" 
                primaryAction={handleSubmit} 
                secondaryActionText="Cancel" 
                secondaryAction={() => history.back()}
            />
        </main>
    );
}