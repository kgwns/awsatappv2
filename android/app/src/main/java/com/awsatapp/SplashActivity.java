package com.awsatapp;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
                intent.putExtras(this.getIntent());
        startActivity(intent);
        finish();
    }
    @Override
public void onNewIntent(Intent intent) {
    setIntent(intent);
    super.onNewIntent(intent);
}
}
