import { useAnimatedHtml } from "@/hooks/use-animated-html";

export function AnimatedText({ content, shouldAnimate }: { content: string; shouldAnimate: boolean }) {
    const { visibleHtml } = useAnimatedHtml(content, shouldAnimate, 50)
    return <span dangerouslySetInnerHTML={{ __html: visibleHtml }} />
}