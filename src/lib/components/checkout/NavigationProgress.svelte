<script>
	// @ts-nocheck
	export let currentStep = null;
</script>

<ul class="w-full steps lg:steps-horizontal pl-[0px]">
	<li class="step step-primary" />
	<li class="step {currentStep != null ? 'step-primary' : ''}" />
	<li class="step {currentStep == 3 ? 'step-primary' : ''}" />
</ul>

<style>

    .step{
        justify-items: start;
    }

	/* Circles */
	.steps .step::after {
		width: 2.4rem;
		height: 2.4rem;
		color: #fff;
		place-self: start;
	}

	/* Lines */
	.steps .step::before {
		height: 0.1rem;
	}
</style>
