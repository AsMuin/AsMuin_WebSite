import { motion } from 'framer-motion';
import Layout from '@theme/Layout';
import '../css/pages/introduction.scss';
export default function Introduction() {
    const textContent =
        '欢迎来到我的个人网站，作为一个刚刚接触Web前端开发的新人，本站作为我平时涉及到的知识记录和总结，主要涉猎于Web前端技术领域。作者搭建的初衷也是尝试个人部署一个属于自己的小避风港。在参与实习之余，拓展自己的开发经历，希望能帮助到更多跟我同样处境的新人。---当然，作者本身技术力有限，部分文案可能存在疏漏或者错误，如果内容出现问题，我欢迎各位通过邮箱的方式跟我进行沟通。---最后，祝你在这里的旅程愉快！';
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
        <Layout title="介绍" description="来自作者的一些话">
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
            <PageEnd></PageEnd>
        </Layout>
    );
}
function PageTitle() {
    // const initMotion = {
    //     opacity: 0,
    //     scale: 0.8
    // };
    const animateMotion = {
        opacity: 1,
        scale: 1
    };
    return (
        <motion.h1 className="page-title">
            {/* <motion.span
                initial={initMotion}
                animate={animateMotion}
                transition={{ duration: 3 }}>
                作者
            </motion.span> */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={animateMotion}
                transition={{ duration: 6 }}>
                留言板
            </motion.span>
        </motion.h1>
    );
}
function PageEnd() {
    return (
        <motion.div className="page-end">
            <h3 className="author">作者：AsMuin</h3>
            <img
                className="page-end-img"
                src={require('@site/static/img/happy-star.png').default}
                alt="happy meet you"
            />
        </motion.div>
    );
}
