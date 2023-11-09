import { useEffect, useState } from "react";
import { LoadImgBase64 } from "../../wailsjs/go/main/App";

interface Props {
	mdPath: string;
	src: string;
	alt: string;
}
export default function CustomImg({ mdPath, src, alt = "" }: Props) {
	const [srcData, setSrcData] = useState<string>("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		LoadImgBase64(mdPath, src as string).then((i) => {
			setSrcData(i);
		});
	}, []);

	return <img src={srcData} alt={alt} />;
}
