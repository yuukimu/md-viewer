import {
	Button,
	Container,
	Divider,
	Flex,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { LoadMD } from "../wailsjs/go/main/App";
import hljs from "./lib/custom-highlight";

function App() {
	const [mdPath, setMDPath] = useState<string>("");
	const [markdown, setMarkdown] = useState<string>("");

	function greet() {
		LoadMD().then((mdInfo) => {
			setMDPath(mdInfo.md_path);
			setMarkdown(mdInfo.content);
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		hljs.highlightAll();
	}, [mdPath, markdown]);

	return (
		<Container h="100%" maxW="8xl">
			<VStack p="1em">
				<Container maxW="6xl" h="40px">
					<Flex gap="3">
						<Button colorScheme="teal" onClick={greet}>
							Read
						</Button>
						<Text
							flex="1"
							overflowX="auto"
							whiteSpace="nowrap"
							lineHeight="40px"
							fontSize="md"
						>
							{mdPath}
						</Text>
					</Flex>
				</Container>

				<Divider pt="1em" borderColor="black" />

				<Container maxW="6xl" p="1em">
					<ReactMarkdown
						rehypePlugins={[rehypeRaw, rehypeSanitize]}
						remarkPlugins={[remarkGfm]}
					>
						{markdown}
					</ReactMarkdown>
				</Container>
			</VStack>
		</Container>
	);
}

export default App;
