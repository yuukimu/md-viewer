import { useEffect, useState } from 'react';
import { LoadMD } from "../wailsjs/go/main/App";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import hljs from './lib/custom-highlight';
import { Button, Container, Divider, VStack, Text, Flex } from '@chakra-ui/react';

function App() {
    const [mdPath, setMDPath] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");

    function greet() {
        LoadMD().then((mdInfo) => {
            console.log(mdInfo)
            setMDPath(mdInfo.md_path);
            setMarkdown(mdInfo.content);

        });
    }

    useEffect(() => {
        hljs.highlightAll();
    }, [markdown]);

    return (
        <Container h='100vh' maxW='8xl' bgColor='whitesmoke'>
            <VStack h='100%' p='1em'>
                <Container maxW='6xl' h='40px'>
                    <Flex gap='3'>
                        <Button colorScheme='teal' onClick={greet}>Read</Button>
                        <Text flex='1' overflowX='auto' whiteSpace='nowrap' lineHeight='40px' fontSize='md'>{mdPath}</Text>
                    </Flex>
                </Container>

                <Divider pt='1em' borderColor='black' />

                <Container maxW='6xl' p='1em'>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        remarkPlugins={[remarkGfm]}>
                        {markdown}
                    </ReactMarkdown>
                </Container>
            </VStack>
        </Container>
    )
}

export default App
