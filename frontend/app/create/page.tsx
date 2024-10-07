import CreateHowItWork from '@/components/ui2/CreateHowItWork';
import HowItWork from '@/components/ui2/HowItWork';
import CreateMarketForm from './CreateMarketForm';

export default function CreateMarketPage() {
  return (
    <main className="v2-container space-y-4">
      <HowItWork content={<CreateHowItWork />}>
        <div className="w-full text-center">
          <div className="text-2xl font-light">Create your own market </div>
          <div className="font-light text-base text-muted-foreground">Creators earn a fee from their markets</div>
        </div>
      </HowItWork>

      <CreateMarketForm />
    </main>
  );
}
