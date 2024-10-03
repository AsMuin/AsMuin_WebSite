import { motion } from 'framer-motion';
import Layout from '@theme/Layout';
import '../css/pages/introduction.scss';
export default function Introduction() {
    const textContent =
        '你好，欢迎来到我的个人网站，我作为一个刚刚接触Web前端开发的新人，热爱编程、设计。在这里做一些个人的分享，有的是技术分享，有的是知识总结，如果你有什么想法，欢迎与我交流。---当然，如果内容出现问题，欢迎指正。我欢迎各位通过邮箱的方式跟我进行沟通。---最后，祝你在这里的旅程愉快！';
    const content = textContent.split('---').map((item, index) => {
        return (
            <motion.p
                initial={{ opacity: 0, x: -10, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 2 + index * 0.5 }}
                key={index}
                className="text">
                {item}
            </motion.p>
        );
    });
    return (
        <Layout title="Introduction" description="just for introduction">
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="page-introduction"> */}
            <PageTitle />
            <motion.section className="content">
                {content}
                {/* <p className="text">
                        Hello,I&apos;m AsMuin, a web developer and designer. I
                        love creating websites and designing user interfaces.
                    </p> */}
            </motion.section>
            {/* </motion.div> */}
        </Layout>
    );
}
function PageTitle() {
    const initMotion = {
        opacity: 0,
        scale: 0.8
    };
    const animateMotion = {
        opacity: 1,
        scale: 1
    };
    return (
        <motion.h1 className="page-title">
            <motion.span
                initial={initMotion}
                animate={animateMotion}
                transition={{ duration: 3 }}>
                Welcome To
            </motion.span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={animateMotion}
                transition={{ duration: 6 }}>
                My Website
            </motion.span>
        </motion.h1>
    );
}
