const DocumentIdLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <main className="w-full overflow-x-hidden">{children}</main>;
};

export default DocumentIdLayout;
