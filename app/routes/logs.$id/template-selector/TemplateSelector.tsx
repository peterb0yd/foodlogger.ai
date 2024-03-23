import { LinksFunction } from "@remix-run/node";
import styles from './TemplateSelector.css';
import { ITemplateWithNestedItems } from "~/api/modules/template/template.interfaces";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Button, links as buttonLinks } from "~/components/button/Button";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...flexBoxLinks(),
    ...buttonLinks(),
];

interface TemplateSelectorProps {
    templates: ITemplateWithNestedItems[];
    onSelect: (template: ITemplateWithNestedItems) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, onSelect }) => {

    if (!templates) return null;

    return (
        <FlexBox as="ul" name="TemplateSelector" col gap="md">
            {templates?.map(template => (
                <Button
                    key={template.id}
                    variant="base"
                    color="muted"
                    border="dotted-thick-muted"
                    onClick={() => onSelect(template)}
                >
                    {template.name}
                </Button>
            ))}
        </FlexBox>
    );
}