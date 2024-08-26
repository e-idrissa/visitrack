import { dateFormat } from "@/lib/utils";

type Visit = {
  id: string;
  name: string;
  lastname: string;
  status: boolean;
  enteredAt: string;
  leftAt: string;
};

export const visitsList: Visit[] = [
  {
    id: 'visit1',
    name: 'John',
    lastname: 'Doe',
    status: true,
    enteredAt: dateFormat('2023-01-01  23:49:59'),
    leftAt: dateFormat('2023-01-02  23:59:59'),
  },
  {
    id: 'visit2',
    name: 'Jane',
    lastname: 'Smith',
    status: false,
    enteredAt: dateFormat('2023-02-15'),
    leftAt: dateFormat('2023-02-20'),
  },
  {
    id: 'visit3',
    name: 'Alice',
    lastname: 'Johnson',
    status: true,
    enteredAt: dateFormat('2023-03-10'),
    leftAt: dateFormat('2023-03-12'),
  },
  {
    id: 'visit4',
    name: 'Bob',
    lastname: 'Williams',
    status: false,
    enteredAt: dateFormat('2023-01-01  23:49:59'),
    leftAt: dateFormat('2023-01-02  23:59:59'),
  },
  {
    id: 'visit5',
    name: 'Charlie',
    lastname: 'Brown',
    status: true,
    enteredAt: dateFormat('2023-05-22'),
    leftAt: dateFormat('2023-05-25'),
  },
  {
    id: 'visit6',
    name: 'David',
    lastname: 'Jones',
    status: false,
    enteredAt: dateFormat('2023-01-01  23:49:59'),
    leftAt: dateFormat('2023-01-02  23:59:59'),
  },
  {
    id: 'visit7',
    name: 'Emily',
    lastname: 'Taylor',
    status: true,
    enteredAt: dateFormat('2023-07-13'),
    leftAt: dateFormat('2023-07-16'),
  },
  {
    id: 'visit8',
    name: 'Frank',
    lastname: 'Hill',
    status: false,
    enteredAt: dateFormat('2023-08-08'),
    leftAt: dateFormat('2023-08-11'),
  },
  {
    id: 'visit9',
    name: 'Grace',
    lastname: 'Scott',
    status: true,
    enteredAt: dateFormat('2023-01-01  23:49:59'),
    leftAt: dateFormat('2023-01-02  23:59:59'),
  },
  {
    id: 'visit10',
    name: 'Henry',
    lastname: 'Clark',
    status: false,
    enteredAt: dateFormat('2023-10-27'),
    leftAt: dateFormat('2023-10-30'),
  },
  {
    id: 'visit11',
    name: 'Ivy',
    lastname: 'Baker',
    status: true,
    enteredAt: dateFormat('2023-11-20'),
    leftAt: dateFormat('2023-11-23'),
  },
  {
    id: 'visit12',
    name: 'Jack',
    lastname: 'Allen',
    status: false,
    enteredAt: dateFormat('2023-01-01  23:49:59'),
    leftAt: dateFormat('2023-01-02  23:59:59'),
  },
];