'use client'

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Flex } from "@/components/ui/flex";
import { FaqType } from "@/types/search-type";

export function Faq({ data }: { data: FaqType }) {

    const [limit, setLimit] = useState(3)

    const increaseLimit = () => {
        if (limit < data.results.length) setLimit(prev => prev + 2)
    }

    if (!data.results || !data.results.length) return null

    const faqItems = data.results.slice(0, limit)

    return (
        <Flex>
            <Flex className="flex-row items-center gap-2 mb-3">
                <MessageCircle size={16} className="text-muted-foreground" />
                <h3 className="font-medium">Inni wyszukiwali również</h3>
            </Flex>
            <Accordion multiple>
                {faqItems.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger onClick={increaseLimit}>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            <Link href={faq.url} className="group flex flex-col gap-2 no-underline! mt-3">
                                <Flex className='flex-row gap-2'>
                                    <img src={faq.meta_url.favicon} className="size-5" />
                                    <Flex>
                                        <span className="text-xs">{faq.meta_url.netloc}</span>
                                        <span className="text-xs text-muted-foreground">{faq.meta_url.netloc} {faq.meta_url.path}</span>
                                    </Flex>
                                </Flex>
                                <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline!">{faq.title}</span>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </Flex>
    )
}