import {Card, CardContent} from '@/components/ui/card.jsx';
import {Button} from '@/components/ui/button.jsx';
import {Label} from '@/components/ui/label.jsx';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input.jsx';
import {toast} from 'sonner';

let blocking = false;

const DataImportExport = ({ calendarManager, onImportSuccess }) => {
  const handleExport = () => {
    if (blocking) return;
    toast.promise(
      new Promise(async (resolve, reject) => {
        blocking = true;
        await new Promise((res) => setTimeout(res, 500));
        try {
          calendarManager.exportData();
          resolve();
        } catch (err) {
          reject(err.message);
        }
      }),
      {
        loading: 'Exporting...',
        success: 'Data exported successfully',
        error: (message) => message,
        position: 'top-center',
        finally() {
          blocking = false;
        },
      },
    );
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            await new Promise((res) => setTimeout(res, 500));
            const message = await calendarManager.importData(file, true);
            onImportSuccess();
            resolve(message);
          } catch (err) {
            reject(err.message);
          }
        }),
        {
          loading: 'Processing...',
          success: 'Data imported successfully',
          error: (message) => message,
          position: 'top-center',
        },
      );
    }
  };

  return (
    <Card className="mb-4">
      {/*<CardHeader>*/}
      {/*<CardTitle>Import/Export Data</CardTitle>*/}
      {/*</CardHeader>*/}
      <CardContent>
        <div className="flex space-x-4">
          <Button onClick={handleExport}>Export Data</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Import Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Data</DialogTitle>
                <DialogDescription>
                  Do not enter any file, select valid json file.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="jsonFile" className="text-right">
                    Data File (JSON)
                  </Label>
                  <Input
                    id="jsonFile"
                    type={'file'}
                    onChange={handleImport}
                    accept={'application/json'}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataImportExport;
