'use client'

import { motion, useScroll } from "framer-motion"
import {Article, mockComments} from "@/lib/Definitions"
import CommentsList from "@/components/CommensList";


export default function ArticleContent({ article }: { article: Article }) {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[10px] bg-gray-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-prose mx-auto">
          <div className="prose prose-lg prose-gray">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-gray-800 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <CommentsList comments={mockComments} />
        </div>
      </div>
    </>
  )
}
