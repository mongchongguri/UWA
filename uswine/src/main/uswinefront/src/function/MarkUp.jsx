function MarkUp({ MakrDownData }) {
  return <div dangerouslySetInnerHTML={{ __html: `${MakrDownData}` }} />;
}

export default MarkUp;
