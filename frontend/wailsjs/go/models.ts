export namespace model {
	
	export class MDInfo {
	    md_path: string;
	    content: string;
	
	    static createFrom(source: any = {}) {
	        return new MDInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.md_path = source["md_path"];
	        this.content = source["content"];
	    }
	}

}

