export default interface board {
    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    writeDatetime: string;
    writerEmail: string;
    writerNickname: string;
    writerProfileImage: string | null;
}

