package com.awsatapp;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.widget.VideoView;
import androidx.appcompat.app.AppCompatActivity;

public class SplashScreen extends AppCompatActivity {
    VideoView videoView;
    PrefManager pref;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);
        videoView = (VideoView) findViewById(R.id.video_view);

        Uri video = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.splashscreen);
        videoView.setVideoURI(video);

        videoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            public void onCompletion(MediaPlayer mp) {
                startNextActivity();
            }
        });

        pref = new PrefManager(this);
        if (pref.isSplashIn() == false) {
            //Splash Screen Load
            videoView.start();
            pref.setSplashIn(true);
        } else {
            startActivity(new Intent(SplashScreen.this, MainActivity.class));
        }
    }

    private void startNextActivity() {
        if (isFinishing())
            return;
        startActivity(new Intent(SplashScreen.this, MainActivity.class));
        finish();
    }
}

