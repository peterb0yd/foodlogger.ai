import { LinksFunction } from "@remix-run/node";
import styles from './TemplateSelector.css';
import { ITemplateWithNestedItems } from "~/api/modules/template/template.interfaces";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { Icon, links as iconLinks } from "~/components/icon/Icon";
import { Text, links as textLinks } from "~/components/text/Text";
import { IconNames } from "~/enums/icons";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...iconLinks(),
    ...textLinks(),
];

interface TemplateSelectorProps {
    templates: ITemplateWithNestedItems[];
    onSelect: (template: ITemplateWithNestedItems) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, onSelect }) => {
    if (!templates) return null;

    return (
        <FlexBox as="ul" name="TemplateSelector" col gap="lg" width="full">
            {templates?.map(template => (
                <TemplateSelection
                    key={template.id}
                    template={template}
                    onSelect={onSelect}
                />
            ))}
        </FlexBox>
    );
}

interface TemplateSelectionProps {
    template: ITemplateWithNestedItems;
    onSelect: (template: ITemplateWithNestedItems) => void;
}

const TemplateSelection = ({ template, onSelect }: TemplateSelectionProps) => {
    const foodSummary = template.items?.map(item => item.name).join(', ');

    return (
        <Button
            variant="dotted-muted"
            width="full"
            size="md"
            onClick={() => onSelect(template)}
        >
            <FlexBox justify="between" width="full">
                <FlexBox gap="sm" align="center" width="full">
                    <Icon name={IconNames.Template} size="sm" color="muted" />
                    <Text color="muted">{template.name} Template</Text>
                </FlexBox>
                <Text
                    color="muted"
                    width="full"
                    align="right"
                    size="sm"
                    truncate
                >
                    {foodSummary}
                </Text>
            </FlexBox>
        </Button>
    );
}