import { useEffect, useState } from "react";
import { LoadImgBase64 } from "../../wailsjs/go/main/App";

interface Props {
	mdPath: string;
	src: string;
	alt: string;
	width: string | number | undefined;
	height: string | number | undefined;
}
export default function CustomImg({
	mdPath,
	src,
	alt = "",
	width,
	height,
}: Props) {
	const [srcData, setSrcData] = useState<string>("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		LoadImgBase64(mdPath, src).then((i) => {
			setSrcData(i);
		});
	}, []);

	return <img src={srcData} alt={alt} width={width} height={height} />;
}
