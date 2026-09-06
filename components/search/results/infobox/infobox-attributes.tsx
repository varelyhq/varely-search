'use client'

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { View } from "@/components/view";
import { useState } from "react";

export function InfoboxAttributes({ attributes }: { attributes: string[][] }) {

    const [isOpen, setIsOpen] = useState(false)

    if (!attributes.length) return null

    const first_three = attributes.slice(0, 3);
    const rest = attributes.slice(3);

    const Attribute = ({ attribute }: { attribute: string[] }) => (
        <View className="mb-2 gap-0.5">
            <span className="font-medium text-xs">
                {attribute[0]}
            </span>
            {
                attribute[1] &&
                <span
                    className="text-xs text-muted-foreground [&_a]:hover:underline"
                    dangerouslySetInnerHTML={{ __html: attribute[1] }}
                />
            }
        </View>
    )

    return (
        <View className="gap-2">
            <h4 className="font-medium">Fakty</h4>

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <View>
                    {first_three.map((attribute, index) => (
                        <Attribute key={index} attribute={attribute} />
                    ))}
                </View>
                <CollapsibleContent>
                    {rest.map((attribute, index) => (
                        <Attribute key={index} attribute={attribute} />
                    ))}
                </CollapsibleContent>
                <CollapsibleTrigger className='flex flex-col' render={
                    <Button size='xs' variant='outline' className='mx-auto'>
                        {isOpen ? 'Pokaż mniej' : 'Pokaż więcej'}
                    </Button>
                }>
                </CollapsibleTrigger>
            </Collapsible>
        </View>
    )
}