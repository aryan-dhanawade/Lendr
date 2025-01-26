import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentActivities = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    type: "Loan Repayment",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "-$39.00",
    type: "Interest Payment",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    type: "Loan Disbursement",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    type: "Loan Repayment",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    type: "Interest Earned",
  },
]

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-8">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
              <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.name}</p>
              <p className="text-sm text-muted-foreground">{activity.email}</p>
            </div>
            <div className="ml-auto font-medium">
              <span className={activity.amount.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {activity.amount}
              </span>
              <p className="text-xs text-muted-foreground">{activity.type}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

