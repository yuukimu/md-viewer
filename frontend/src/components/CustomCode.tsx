import { CopyIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ExtraProps } from "react-markdown";

interface Props {
	classAttr: string | undefined;
	value: React.ReactNode;
}

export default function CustomCode({ classAttr, value }: Props) {
	const classNames =
		classAttr !== undefined
			? classAttr.split(":")
			: ["language-javascript", ""];
	const lang = classNames[0];
	const fileName = classNames[1] ? classNames[1] : "";
	return (
		<Box backgroundColor="#272822" position="relative">
			{fileName !== "" && (
				<Badge h="100%" py="0.3em" px="0.5em" backgroundColor="gray.400">
					{fileName}
				</Badge>
			)}
			<CopyToClipboard text={value?.toString() as string} onCopy={() => {}}>
				<IconButton
					position="absolute"
					right="6px"
					variant="outline"
					colorScheme="teal"
					aria-label="Copy Code"
					size="sm"
					mt="6px"
					mr="6px"
					icon={<CopyIcon />}
				/>
			</CopyToClipboard>
			<code className={lang}>{value}</code>
		</Box>
	);
}
