package com.myapp;

import static androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL;

import android.app.Activity;
import android.content.Intent;
import android.provider.Settings;

import androidx.biometric.BiometricManager;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AuthModule extends ReactContextBaseJavaModule {
    AuthModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(mActivityEventListener);
    }

    static int INTENT_CREATE_SCREEN_LOCK = 1;
    private Promise mPromise;

    @Override
    public String getName() {
    return "AuthModule";
    }

    @ReactMethod
    public void enroll(final Promise promise) {
        mPromise = promise;
        BiometricManager biometricManager = BiometricManager.from(getReactApplicationContext());
        switch (biometricManager.canAuthenticate(DEVICE_CREDENTIAL)) {
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                // Prompts the user to create credentials that your app accepts.
                final Intent enrollIntent = new Intent(Settings.ACTION_BIOMETRIC_ENROLL);
                enrollIntent.putExtra(Settings.EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED, DEVICE_CREDENTIAL);
                getReactApplicationContext().startActivityForResult(enrollIntent,INTENT_CREATE_SCREEN_LOCK, null);
                break;
            default:
                mPromise.reject("error", "failed");
        }
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == INTENT_CREATE_SCREEN_LOCK) {
                if (resultCode == BiometricManager.BIOMETRIC_SUCCESS) {
                    mPromise.resolve("success");
                } else {
                    mPromise.reject("error", "failed");
                }
            }
        }
    };
}