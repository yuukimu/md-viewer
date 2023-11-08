import { CopyIcon } from "@chakra-ui/icons";
import {
	Badge,
	Box,
	Flex,
	IconButton,
	Spacer,
	Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface Props {
	classAttr: string | undefined;
	value: React.ReactNode;
}

export default function CustomCode({ classAttr, value }: Props) {
	const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
	const [tooltipIsDisabled, setTooltipIsDisabled] = useState<boolean>(true);
	const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);

	const onCopyHandler = () => {
		setTooltipIsDisabled(false);
		setTooltipIsOpen(true);
		setTimeout(function () {
			setTooltipIsDisabled(true);
			setTooltipIsOpen(false);
		}, 1000);
	};

	const classNames =
		classAttr !== undefined
			? classAttr.split(":")
			: ["language-javascript", ""];
	const lang = classNames[0];
	const fileName = classNames[1] ? classNames[1] : "";
	return (
		<Box
			backgroundColor="#272822"
			position="relative"
			onMouseEnter={() => setShowCopyToClipboard(true)}
			onMouseLeave={() => setShowCopyToClipboard(false)}
		>
			{fileName !== "" && (
				<Badge h="100%" py="0.3em" px="0.5em" backgroundColor="gray.400">
					{fileName}
				</Badge>
			)}
			{showCopyToClipboard && (
				<CopyToClipboard
					text={value?.toString() as string}
					onCopy={() => {
						onCopyHandler();
					}}
				>
					<IconButton
						position="absolute"
						right="6px"
						variant="outline"
						colorScheme="teal"
						aria-label="Copy Code"
						size="sm"
						mt="6px"
						mr="6px"
						icon={
							<Tooltip
								label="Copied!"
								isDisabled={tooltipIsDisabled}
								isOpen={tooltipIsOpen}
							>
								<CopyIcon />
							</Tooltip>
						}
					/>
				</CopyToClipboard>
			)}
			<code className={lang}>{value}</code>
		</Box>
	);
}
