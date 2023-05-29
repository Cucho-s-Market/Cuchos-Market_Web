<script>
    // @ts-nocheck
    export let currentStep = null;
</script>

<ul class="w-full steps steps-vertical lg:steps-horizontal">
    <li class="step step-primary"></li>
    <li class="step {currentStep != null ? 'step-primary' : ''}"></li>
    <li class="step {currentStep == 3 ? 'step-primary' : ''}"></li>
</ul>

<style>
    /* Circles */
    .steps .step::after{
        width: 2.4rem;
        height: 2.4rem;
    }

    /* Lines */
    .steps .step::before{
        height: 0.1rem;
    }
</style>