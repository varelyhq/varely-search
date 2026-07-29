'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { View } from "@/components/view";
import { FaqItem, FaqType } from "@/types/search-type";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FaqSingle({ data, asAccordion }: { data: FaqItem, asAccordion: boolean }) {

    if (!asAccordion) return (
        <View>
            {data.title}
            {data.url}
            {data.question}
            {data.answer}
            {data.meta_url.netloc}
        </View>
    )
}

export function Faq({ data }: { data: FaqType }) {

    const [limit, setLimit] = useState(3)

    const increaseLimit = () => {
        if (limit < data.results.length) setLimit(prev => prev + 2)
    }

    if (!data.results || !data.results.length) return null

    const faqItems = data.results.slice(0, limit)

    return (
        <View>
            <View className="flex-row items-center gap-2 mb-3">
                <MessageCircle size={16} className="text-muted-foreground" />
                <h3 className="font-medium">Inni wyszukiwali również</h3>
            </View>
            <Accordion multiple>
                {faqItems.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger onClick={increaseLimit}>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            <Link href={faq.url} className="no-underline!">
                                <View className="mt-3 gap-2">
                                    <View className='flex-row gap-2'>
                                        <img src={faq.meta_url.favicon} className="size-5" />
                                        <View>
                                            <span className="text-xs">{faq.meta_url.netloc}</span>
                                            <span className="text-xs text-muted-foreground">{faq.meta_url.netloc} {faq.meta_url.path}</span>
                                        </View>
                                    </View>
                                    <span className="text-sm text-blue-600 hover:underline!">{faq.title}</span>
                                </View>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                    // <FaqSingle key={index} data={faq} asAccordion />
                ))}
            </Accordion>
        </View>
    )
}