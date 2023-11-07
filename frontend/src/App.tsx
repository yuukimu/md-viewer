import {
	Button,
	Container,
	Divider,
	Flex,
	Text,
	VStack,
} from "@chakra-ui/react";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { LoadMD } from "../wailsjs/go/main/App";
import hljs from "./lib/custom-highlight";

function App() {
	const [mdPath, setMDPath] = useState<string>("");
	const [markdown, setMarkdown] = useState<string>("");

	function readMD() {
		LoadMD().then((mdInfo) => {
			setMDPath(mdInfo.md_path);
			setMarkdown(mdInfo.content);
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const codes = document.querySelectorAll("pre code");
		for (const code of codes) {
			if (code.attributes.getNamedItem("data-highlighted") !== null) {
				code.attributes.removeNamedItem("data-highlighted");
			}
		}
		hljs.highlightAll();
	}, [markdown]);

	return (
		<Container h="100%" maxW="8xl">
			<VStack p="1em">
				<Container maxW="6xl" h="40px">
					<Flex gap="3">
						<Button colorScheme="teal" onClick={readMD}>
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
					<MDView markdown={markdown} />
				</Container>
			</VStack>
		</Container>
	);
}

export default App;

const MDView = memo(({ markdown }: { markdown: string }) => {
	return (
		<ReactMarkdown
			rehypePlugins={[rehypeRaw, rehypeSanitize]}
			remarkPlugins={[remarkGfm]}
		>
			{markdown}
		</ReactMarkdown>
	);
});
