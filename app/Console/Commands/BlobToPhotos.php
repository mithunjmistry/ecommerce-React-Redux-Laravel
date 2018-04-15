<?php

namespace App\Console\Commands;

use App\Photo;
use Illuminate\Console\Command;

class BlobToPhotos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blob:photos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Converts blob to photos';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $photos = Photo::all();
        foreach ($photos as $photo){
            $photo_id = $photo->id;
            file_put_contents('C:\Users\Mithun\ecommercephotos\product'.$photo_id.'.jpg', $photo->photo);
        }
    }
}
