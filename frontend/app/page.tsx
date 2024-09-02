import styles from "./ui/page.module.css";
import {Blog} from "@/app/types";
import BlogSlider from "@/app/ui/BlogSlider";

const sampleBlogs: Blog[] = [
    {
        id: 1,
        title: 'Blog Post 1',
        image: "assets\\placeimg_500_300_arch5.jpg",
        description: 'Description for blog post 1',
    },
    {
        id: 2,
        title: 'Blog Post 2',
        image: "assets\\placeimg_500_300_arch7.jpg",
        description: 'Description for blog post 2',
    },
    {
        id: 3,
        title: 'Blog Post 3',
        image: "assets\\placeimg_500_300_arch6.jpg",
        description: 'Description for blog post 3',
    },
];


export default function Home() {
    return (
        <main className={styles.main}>

            <div>
                <BlogSlider blogs={sampleBlogs}/>
            </div>

            <div className={styles.grid}>
                <a
                    href=""
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Sign In <span>-&gt;</span>
                    </h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                </a>

                <a
                    href=""
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Sing Up <span>-&gt;</span>
                    </h2>
                    <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
                </a>

            </div>
        </main>
    );
}
