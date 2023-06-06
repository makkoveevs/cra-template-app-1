export type TExamplePost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type TTemplateMethodPostResponse = TExamplePost;

export type TTemplateMethodPostRequestData = {
  keyA: string;
  keyB: number;
};

export type TTemplateMethodGetResponse = TExamplePost[];
export type TTemplateMethodGetByIdResponse = TExamplePost;
