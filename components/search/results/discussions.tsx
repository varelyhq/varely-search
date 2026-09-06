'use client'

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { ArrowRight, ArrowUp, MessagesSquare } from "lucide-react"
import Image from "next/image"
import { DiscussionsType, SearchResult } from "@/types/search-type"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Flex } from "@/components/ui/flex"

export function Discussion({ data }: { data: SearchResult }) {
    return (
        null
    )
}

export function Discussions({ data }: { data: DiscussionsType }) {

    const [visibleCount, setVisibleCount] = useState(3)

    if (!data) return null;

    const discussions = data.results.slice(0, visibleCount)

    return (
        <Flex className="gap-4 my-4">
            <Flex className='gap-2'>
                <h2>Dyskusje</h2>
            </Flex>
            <Accordion>
                {discussions.map((discussion, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            <h3 className="font-medium">{discussion.title}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Flex className="flex-1 break-words">
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
                            </Flex>
                        </AccordionContent>
                        <Flex className='flex-row gap-2 text-xs text-muted-foreground px-4 pb-2 items-center'>

                            <Flex className='flex-row gap-1 items-center'>
                                <Image width={16} height={16} src={discussion.meta_url.favicon} alt='' />
                                <span>{discussion.data.forum_name} ({discussion.language})</span>
                            </Flex>
                            ·
                            <Flex className='flex-row gap-1 items-center'>
                                <MessagesSquare size={14} />
                                <span>{discussion.data.num_answers}</span>
                            </Flex>
                            ·
                            <Flex className='flex-row gap-1 items-center'>
                                <ArrowUp size={14} />
                                <span>{discussion.data.score}</span>
                            </Flex>
                            ·
                            <span>{discussion.age}</span>
                        </Flex>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button
                variant='outline'
                size='sm'
                className='mx-auto'
                onClick={() => setVisibleCount(prevState => prevState === 3 ? 20 : 3)}
            >
                {visibleCount === 3 ? 'Pokaż więcej' : 'Pokaż mniej'}
            </Button>
        </Flex>
    )
}
