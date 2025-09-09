<template>
  <PolicyLayout
    title="Privacy Policy"
    subtitle="Your privacy matters to us"
    :back-link="{ name: 'cookies' }"
    back-link-text="View Cookies Policy →"
  >
    <template #content>
      <PolicyCard icon="🛡️" title="Introduction">
        <p>
          We respect your privacy and are committed to protecting your personal data. This privacy
          policy will inform you about how we look after your personal data when you visit our
          website and tell you about your privacy rights.
        </p>
      </PolicyCard>

      <PolicyCard icon="📊" title="Data We Collect">
        <p>
          We may collect, use, store, and transfer different kinds of personal data about you which
          we have grouped together as follows:
        </p>
        <div class="data-categories">
          <div class="data-item">
            <div class="data-badge identity">Identity Data</div>
            <p>First name, last name, username or similar identifier</p>
          </div>
          <div class="data-item">
            <div class="data-badge contact">Contact Data</div>
            <p>Email address and telephone numbers</p>
          </div>
          <div class="data-item">
            <div class="data-badge technical">Technical Data</div>
            <p>
              IP address, browser type and version, time zone setting and location, browser plug-in
              types and versions, operating system and platform
            </p>
          </div>
        </div>
      </PolicyCard>

      <PolicyCard icon="⚖️" title="How We Use Your Data">
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use
          your personal data in the following circumstances:
        </p>
        <ul class="usage-list">
          <li>
            Where we need to perform the contract we are about to enter into or have entered into
            with you
          </li>
          <li>
            Where it is necessary for our legitimate interests (or those of a third party) and your
            interests and fundamental rights do not override those interests
          </li>
          <li>Where we need to comply with a legal obligation</li>
        </ul>
      </PolicyCard>

      <PolicyCard icon="🔒" title="Data Security">
        <p>
          We have put in place appropriate security measures to prevent your personal data from
          being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We
          limit access to your personal data to those who have a genuine business need to know it.
        </p>
      </PolicyCard>

      <PolicyCard icon="👤" title="Your Rights">
        <p>Under certain circumstances, you have rights under data protection laws including:</p>
        <div class="rights-grid">
          <div class="right-item">
            <h4>Access</h4>
            <p>Request access to your personal data</p>
          </div>
          <div class="right-item">
            <h4>Correction</h4>
            <p>Request correction of your personal data</p>
          </div>
          <div class="right-item">
            <h4>Erasure</h4>
            <p>Request erasure of your personal data</p>
          </div>
          <div class="right-item">
            <h4>Objection</h4>
            <p>Object to processing of your personal data</p>
          </div>
          <div class="right-item">
            <h4>Restriction</h4>
            <p>Request restriction of processing</p>
          </div>
          <div class="right-item">
            <h4>Portability</h4>
            <p>Request transfer of your personal data</p>
          </div>
        </div>
      </PolicyCard>
    </template>
  </PolicyLayout>
</template>

<script setup lang="ts">
import PolicyLayout from "@/layouts/PolicyLayout.vue";
import PolicyCard from "@/components/Policy/PolicyCard.vue";
</script>
