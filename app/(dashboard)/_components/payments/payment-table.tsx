'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Eye } from 'lucide-react';
import Link from 'next/link';

type Payment = {
  id: string;
  transactionId: string;
  rentalOrderId: string;
  amount: string;
  status: string;
  paidAt: string;
  createdAt: string;
};

type Props = {
  payments: Payment[];
};

export default function PaymentTable({ payments }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Payments</CardTitle>

        <Badge variant="secondary">{payments.length} Payments</Badge>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>

              <TableHead>Transaction</TableHead>

              <TableHead>Amount</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Paid At</TableHead>

              <TableHead>Created</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id.slice(0, 8)}...</TableCell>

                <TableCell>{payment.transactionId}</TableCell>

                <TableCell>৳{Number(payment.amount).toLocaleString()}</TableCell>

                <TableCell>
                  <Badge variant={payment.status === 'PAID' ? 'default' : 'destructive'}>
                    {payment.status}
                  </Badge>
                </TableCell>

                <TableCell>{new Date(payment.paidAt).toLocaleString()}</TableCell>

                <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>

                <TableCell className="text-right">
                  <Button size="icon" variant="outline" asChild>
                    <Link href={`/admin-dashboard/payments/${payment.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
