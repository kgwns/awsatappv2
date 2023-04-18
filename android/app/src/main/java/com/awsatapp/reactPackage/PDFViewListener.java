package com.awsatapp.reactPackage;

import android.util.Log;
import androidx.annotation.Nullable;
import com.awsatapp.reactPackage.model.Pdf;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class PDFViewListener extends ReactContextBaseJavaModule {

    private static PDFViewListener INSTANCE;

    public  PDFViewListener(ReactApplicationContext reactContext) {
        super(reactContext);
        PDFViewListener.INSTANCE = this;
    }

    public static  PDFViewListener getInstance() {
        return  PDFViewListener.INSTANCE;
    }

    @Override
    public String getName() {
        return "PDFViewListener";
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {

        try {
            this.getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } catch (Exception e) {
            Log.e(eventName, "sendEvent called before bundle loaded");
        }

    }
    public static void sendPdfInfo(Pdf pdf) {
        if( getInstance()!=null ) {
            WritableMap params = Arguments.createMap();
            params.putString("created", String.valueOf(pdf.getCreated()));
            params.putInt("downloadStatus", pdf.getStatus());
            getInstance().sendEvent("pdfInfo", params);
        }
    }
}
