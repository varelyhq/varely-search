'use client'

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { View } from "@/components/view"
import { DiscussionsType } from "@/types/SearchType"
import { ArrowRight, ArrowUp, MessagesSquare } from "lucide-react"
import Image from "next/image"

export function Discussions({ discussions }: { discussions: DiscussionsType }) {

    if (!discussions) return null;

    return (
        <View className="gap-6 my-6">
            <View className='gap-2'>
                <h2>Dyskusje</h2>
            </View>
            <Accordion defaultValue={["item-1"]} className="max-w-156">
                {discussions.results.map((discussion, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            <h3 className="font-medium">{discussion.title}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                            <View className="flex-1 break-words">
                                {/* {discussion.data.question && <span className="font-medium" dangerouslySetInnerHTML={{ __html: discussion.data.question }} />} */}
                                <span>
                                    {discussion.data.top_comment}
                                    <Link href={discussion.url} className='no-underline!'>
                                        <span className='inline-flex flex-row gap-1 items-center'>
                                            <span className="text-blue-500 ml-1">Więcej na {discussion.meta_url.hostname}</span>
                                            <ArrowRight size={14} className="text-blue-500" />
                                        </span>
                                    </Link>
                                </span>
                            </View>
                        </AccordionContent>
                        <View className='flex-row gap-2 text-xs text-muted-foreground px-4 pb-2 items-center'>

                            <View className='flex-row gap-1 items-center'>
                                <Image width={16} height={16} src={discussion.meta_url.favicon} alt='' />
                                <span>{discussion.data.forum_name} ({discussion.language})</span>
                            </View>

                            <View className='flex-row gap-1 items-center'>
                                <MessagesSquare size={14} />
                                <span>{discussion.data.num_answers}</span>
                            </View>
                            <View className='flex-row gap-1 items-center'>
                                <ArrowUp size={14} />
                                <span>{discussion.data.score}</span>
                            </View>
                            <span>{discussion.age}</span>
                        </View>
                    </AccordionItem>
                ))}
            </Accordion>
        </View >
    )
}
