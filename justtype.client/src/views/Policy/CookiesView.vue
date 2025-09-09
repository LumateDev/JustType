<template>
  <PolicyLayout
    title="Cookies Policy"
    subtitle="Understanding how we use cookies to enhance your experience"
    :back-link="{ name: 'privacy' }"
    back-link-text="← View Privacy Policy"
  >
    <template #content>
      <PolicyCard icon="🍪" title="What Are Cookies">
        <p>
          Cookies are small text files placed on your device when you visit websites. They help
          websites remember your preferences, improve functionality, and provide insights to enhance
          your browsing experience.
        </p>
      </PolicyCard>

      <PolicyCard icon="🔍" title="How We Use Cookies">
        <p>We use cookies strategically to optimize your experience:</p>
        <div class="cookie-types">
          <div class="cookie-item">
            <div class="cookie-badge essential">Essential</div>
            <p>Required for basic website functionality and security</p>
          </div>
          <div class="cookie-item">
            <div class="cookie-badge analytical">Analytical</div>
            <p>Help us understand how visitors interact with our site</p>
          </div>
          <div class="cookie-item">
            <div class="cookie-badge functional">Functional</div>
            <p>Remember your preferences and settings</p>
          </div>
        </div>
      </PolicyCard>

      <PolicyCard icon="⚙️" title="Managing Cookies">
        <p>You have control over cookies. Most browsers allow you to:</p>
        <ul class="management-list">
          <li>Block or delete specific cookies</li>
          <li>Set preferences for different websites</li>
          <li>Receive notifications when cookies are set</li>
        </ul>
        <p class="note">Note: Disabling essential cookies may affect website functionality.</p>
      </PolicyCard>

      <PolicyCard icon="🌐" title="Third-Party Cookies">
        <p>We may partner with trusted third parties who use cookies for:</p>
        <div class="third-party-grid">
          <div class="third-party-item">
            <h4>Analytics</h4>
            <p>Understanding user behavior patterns</p>
          </div>
          <div class="third-party-item">
            <h4>Performance</h4>
            <p>Monitoring and improving site performance</p>
          </div>
          <div class="third-party-item">
            <h4>Services</h4>
            <p>Integrating external features and tools</p>
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
