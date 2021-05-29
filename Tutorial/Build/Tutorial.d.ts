declare namespace Tutorial {
    function Animation(): ƒS.SceneReturn;
}
declare namespace Tutorial {
    function Decision(): ƒS.SceneReturn;
}
declare namespace Tutorial {
    function End(): ƒS.SceneReturn;
}
declare namespace Tutorial {
    function Inventory(): ƒS.SceneReturn;
}
declare namespace Tutorial {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transition: {
        clock: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        backgroundTheme: string;
        click: string;
    };
    let locations: {
        city: {
            name: string;
            background: string;
        };
        bench: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Narrator: {
            name: string;
        };
        Aoi: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
        Ryu: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
                smile: string;
            };
        };
    };
    let items: {
        BlobRED: {
            name: string;
            description: string;
            image: string;
        };
        BlobBU: {
            name: string;
            description: string;
            image: string;
        };
        BlobDKBU: {
            name: string;
            description: string;
            image: string;
        };
        BlobGN: {
            name: string;
            description: string;
            image: string;
        };
        BlobPK: {
            name: string;
            description: string;
            image: string;
        };
        BlobYL: {
            name: string;
            description: string;
            image: string;
        };
        BlobOG: {
            name: string;
            description: string;
            image: string;
        };
    };
    let dataForSave: {
        score: number;
        Protagonist: {
            name: string;
        };
        ended: boolean;
    };
}
declare namespace Tutorial {
    function Text(): ƒS.SceneReturn;
}
