export default async (
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): void; new (): any };
    };
  }
) => {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  res.status(200).send("OK");
};
