const PaymentsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>PaymentsDetailsPage {id}</div>;
};

export default PaymentsDetailsPage;
